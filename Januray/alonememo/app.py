# 가상환경 설치
# python3 -m venv .venv
# beautifulsoup4 스크래핑
# pymongo 몽고 사용
#  flask router
# pylnt 오류 잡기
# requests 간편한 HTTP 요청처리를 위해 사용
from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)


client = MongoClient('localhost', 27017)
db = client.dbjungle


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/memo', methods=['GET'])
def read_articles():
    # 1. 모든 document 찾기 & _id 값은 출력에서 제외
    result = list(db.articles.find({}, {'_id': 0}))
    # 2. articles라는 키 값으로 영화정보 내려주기
    return jsonify({'result': 'success', 'articles': result})


@app.route('/memo', methods=['POST'])
def saving():
    # 1. 클라이언트로부터 데이터 받기
    url_receive = request.form['url_give']  # 클라이언트로부터 url받는 부분
    comment_receive = request.form['comment_give']  # 클라이언트로부터 comment 받는 부분

    # 2. meta tag 스크래핑
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    og_image = soup.select_one('meta[property="og:image"]')
    og_title = soup.select_one('meta[property="og:title"]')
    og_description = soup.select_one('meta[property="og:description"]')

    url_title = og_title['content']
    url_description = og_description['content']
    url_image = og_image['content']

    article = {'url': url_receive, 'title': url_title, 'desc': url_description, 'image': url_image,
               'comment': comment_receive}
    # mongoDB에 데이터 넣기
    db.articles.insert_one(article)

    return jsonify({'result': 'success', 'msg': 'POST conenct success'})


if __name__ == '__main__':
    # Mac OS Montery에서 이미 5000번을 쓰고 있음.
    app.run('0.0.0.0', port=3000, debug=True)
