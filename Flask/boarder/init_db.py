import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbborder


# DB에 저장할 영화인들의 출처 url을 가져옵니다.
def get_urls():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(
        'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105', headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    trs = soup.select('div.section > ul > li > a')

    urls = []
    for tr in trs:
        if tr is not None:
            base_url = 'https://news.naver.com/'
            url = base_url + tr['href']
            # url = tr['href']
            urls.append(url)

    # print(urls)

    # for url in urls:
    #     doc = {'url': url}
    #     db.board.insert_one(doc)

    return urls


def get_info(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    title = soup.select_one('meta[property="og:title"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']
    desc = soup.select_one('meta[property="og:description"]')['content']
    article = soup.select_one('meta[property="og:article:author"]')['content']

    doc = {'title': title, 'image': image, 'desc': desc, 'article': article}

    db.board.insert_one(doc)

    print('완료!', title)
    return 0


# 기존 mystar 콜렉션을 삭제하고, 출처 url들을 가져온 후, 크롤링하여 DB에 저장합니다.
def insert_all():
    db.board.drop()
    urls = get_urls()
    for url in urls:
        get_info(url)
    return 0


insert_all()
