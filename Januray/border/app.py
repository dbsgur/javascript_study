from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbborder


# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/board')
def board():
    return render_template('board.html')

# sing up
@app.route('/user/signup', methods=['POST'])
def signup():
    # id, password 받아오고 저장
    user_id = request.form['user_id']
    user_pwd = request.form['user_pwd']
    # id 중복확인
    if db.board.count_documents({'user_id':user_id}) == 0 :
        db.board.insert_one({'user_id':user_id, 'user_pwd': user_pwd})
        return jsonify({'result':'success', 'message':'SIGN UP SUCCESS'})
    else :
        return jsonify({'result': 'FAIL', 'message':'user_id already exists'})

# log in
@app.route('/user/login', methods=['POST'])
def login():
    # id, password 받아오귀
    user_id = request.form['user_id']
    user_pwd = request.form['user_pwd']
    # id 확인
    if db.board.count_documents({'user_id': user_id}) == 0:
        return jsonify({'result':'FAIL', 'message': 'WRONG ID'})
    else :
        # 비번 확인
        # count_documents VS findone?
        if db.board.count_documents({'user_id':user_id, 'user_pwd':user_pwd}) == 0 :
            return jsonify({'result':'FAIL', 'message': 'WRONG PWD'})
        else:
            return jsonify({'result':'SUCCESS', 'message': 'LOGIN SUCCESS'})




if __name__ == '__main__':
    app.run('0.0.0.0', port=3000, debug=True)

