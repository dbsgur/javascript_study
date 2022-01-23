###########################
#      Flask_Traning      #
###########################
from flask import Flask
app = Flask(__name__)


@app.route('/')
def home():
    return 'This is Home!'


if __name__ == '__main__':
    # Mac OS Montery에서 이미 5000번을 쓰고 있음.
    app.run('0.0.0.0', port=3000, debug=True)


# Get request API code


@app.route('/test', methods=['GET'])
def test_get():
    title_receive = request.args.get('title_give')
    print(title_receive)
    return jsonify({'result': 'success', 'msg': '이 요청은 GET!'})


# Get request Ajax code
$.ajax({
    type: "GET",
    url: "/test?title_give=봄날은간다",
    data: {},
    success: function(response){
       console.log(response)
       }
})

# POST request API code


@app.route('/test', methods=['POST'])
def test_post():
    title_receive = request.form['title_give']
    print(title_receive)
    return jsonify({'result': 'success', 'msg': '이 요청은 POST!'})


# POST request Ajax code
$.ajax({
    type: "POST",
    url: "/test",
    data: {title_give: '봄날은간다'},
    success: function(response){
       console.log(response)
       }
})
