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

@app.route('/user/login', methods=['POST'])
def login():
    return 'sss'



if __name__ == '__main__':
    app.run('0.0.0.0', port=3000, debug=True)

