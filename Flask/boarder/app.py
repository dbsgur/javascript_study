from datetime import datetime
from datetime import timedelta
from datetime import timezone

from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
# from flask.ext.bcrypt import Bcrypt
#  pip install flask-bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_refresh_token
# from flask_jwt_extended import jwt_refresh_token_required
# pip install flask-jwt-extended

app = Flask(__name__)

# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "hyuk-is-coding..."
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

bcrypt = Bcrypt(app)
# client = MongoClient('mongodb://test:test@localhost',27017)
client = MongoClient('localhost', 27017)
db = client.dbborder
# JWT
jwt = JWTManager(app)


# Using an `after_request` callback, we refresh any token that is within
# 30 minutes of expiring. Change the timedeltas to match the needs of your application.
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

#####################
#     ROUTING       #
#####################

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/board')
@jwt_required()
def board():
    # current_user = get_jwt_identity()
    return render_template('board.html'), 200

@app.route('/news')
@jwt_required()
def news():
    # current_user = get_jwt_identity()
    return render_template('news.html'), 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    # current_user 값이 db에 있는지 확인이 아니라
    # 200이냐 401이냐확인
    # get_jwt_identity()메서드는 현재 유효한 토큰임을 확인했기 때문에 서명된 사용자 이름을
    # 찾을 수 있을 것이다. 그 사용자 이름. 즉, 식별자 identity를 반환하는 함수다.
    return jsonify(logged_in_as=current_user), 200

#####################
#      USER         #
#####################
# sing up


@app.route('/user/signup', methods=['POST'])
def signup():
    # id, password 받아오고 저장
    user_id = request.form['user_id']
    user_pwd = request.form['user_pwd']
    pw_hash = generate_password_hash(user_pwd, 10)
    # id 중복확인
    if db.user.count_documents({'user_id': user_id}) == 0:
        db.user.insert_one({'user_id': user_id, 'user_pwd': pw_hash})
        return jsonify({'result': 'SUCCESS', 'message': 'SIGN UP SUCCESS'})
    else:
        return jsonify({'result': 'FAIL', 'message': 'user_id already exists'})

# log in


@app.route('/user/login', methods=['POST'])
def login():
    # id, password 받아오귀
    user_id = request.form['user_id']
    user_pwd = request.form['user_pwd']
    # id 확인
    if db.user.count_documents({'user_id': user_id}) == 0:
        # 401 error : 인증 자격 없음
        return jsonify({'result': 'FAIL', 'message': 'WRONG ID'}) #, 401
    # else:
        # 비번 확인
        # count_documents VS findone?
    check_pwd = db.user.find_one({"user_id":user_id})
    if check_password_hash(check_pwd.get('user_pwd'), user_pwd):
        response = jsonify({'result': 'SUCCESS', 'message': 'LOGIN SUCCESS'})
        access_token = create_access_token(identity=user_id)
        # refresh_token = create_refresh_token(identity=user_id)
        # session['logged_in'] = True
        set_access_cookies(response, access_token)
        return response
    else :
        return jsonify({'result': 'FAIL', 'message': 'WRONG PWD'})#, 401
        # if db.board.count_documents({'user_id': user_id, 'user_pwd': user_pwd}) == 0:
        #     return jsonify({'result': 'FAIL', 'message': 'WRONG PWD'})
        # else:
        #     return jsonify({'result': 'SUCCESS', 'message': 'LOGIN SUCCESS'})

@app.route('/user/logout', methods=["POST"])
def logout():
    response = jsonify({"message": "LOGOUT SUCCESS"})
    unset_jwt_cookies(response)
    return response

#####################
#     HOT NEWS      #
#####################

@app.route('/news/read', methods=["GET"])
def read_news():
    news = list(db.news.find({},{'_id':False}))
    return jsonify({'result':'SUCCESS','news_list': news, 'message': 'NEWS READ SUCCESS '})

##################
#     BOARD      #
##################
# CREATE
@app.route('/board/create', methods=["POST"])
def create_board():
    # 정보 가져오기 > id, title, content, date, like가 있어야하는뎅? schema 피료없나염
    user_id = request.form['user_id']
    post_title = request.form['post_title']
    post_content = request.form['post_content']
    post_date = request.form['post_date']
    # 처리 백? 프론트?
    post_likes = request.form['post_likes']
    # 저장
    db.board.insert_one({'user_id': user_id, 'post_title': post_title, 'post_content':post_content, 'post_likes':post_likes, 'post_date' : post_date})
    return jsonify({'result':'SUCCESS', 'message': 'CREATE SUCCESS'})

# READ
@app.route('/board/read', methods=["GET"])
def read_board():
    posts = list(db.board.find({},{'_id':False}))
    return jsonify({'result':'SUCCESS', 'posts':posts})

# UPDATE
@app.route('/board/update', methods=["PATCH"])
def update_board():
    # post id로 업뎃하는데 어케 받지
    return jsonify({'result':'SUCCESS'})

# DELETE
@app.route('/board/delete', methods=["DELETE"])
def delete_board():
    # post id로 지워야하는데 어케 받지
    return jsonify({'result':'SUCCESS'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=3000, debug=True)
