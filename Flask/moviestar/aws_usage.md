sudo chmod 400 받은키페어를끌어다놓기

ssh -i 받은키페어를끌어다놓기 ubuntu@AWS에적힌내아이피

ex) ssh -i 받은키페어를끌어다놓기 ubuntu@AWS에적힌내아이피

# python 이라는 명령어로 3 버전 이상을 실행하도록 하는 명령어입니다.

sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 10

# home 디렉토리로 이동

cd ~

# 실행. 콘솔창에 hellow world!가 뜨는 것을 확인 할 수 있습니다.

python hello.py

```bash
# pip3 설치
sudo apt-get update
sudo apt-get install -y python3-pip

# 버전 확인
pip3 --version

# pip3 대신 pip 라고 입력하기 위한 명령어
# 아래 명령어를 입력하면 pip 라고 쳐도 pip3를 작동시킬 수 있습니다.
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
```

pip install flask

# mongoDB install

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

sudo apt-get update

sudo apt-get install -y mongodb-org

```

## mongoDB execute

```
sudo service mongodb start
```

우리가 만든 mongoDB를 외부 접속할 수 있게 하기 위해,
접속에 필요한 아이디와 비밀번호를 세팅해봅니다.
설정을 하지 않으면 누구나 DB정보를 볼 수 있게 됩니다.

## mongoDB 접속 계정 생성

```# mongoDB 쉘에 들어가기
mongo
```

```
# admin으로 계정 바꾸기
use admin;

# 계정 생성하기
db.createUser({user: "test", pwd: "test", roles:["root"]});
```

```
# mongoDB 쉘에서 나오기
exit

# MongoDB 재시작
sudo service mongod restart
OR
sudo service mongodb restart
```

## mongoDB 외부에 열어주기

```
sudo vi /etc/mongod.conf
OR
sudo vi /etc/mongodb.conf
```

```
net:
  port: 27017
  bindIp : 0.0.0.0
OR
port : 27017
bind_ip : 0.0.0.0

security:
  authorization: enabled
OR
auth=true
```

재시작

```
sudo service mongodb restart
```

KILL

```
ps -ef | grep 'app.py'
```
