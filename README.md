# electron-js-docker-engine
GUI app development using docker × electron × nodejs  


electron と javascriptでローカルアプリを開発するための環境です。
electronとは? [こちら](https://qiita.com/saki-engineering/items/203892838e15b3dbd300)がわかりやすいので参照ください。

※WSL2にdocker engineをインストールした環境を想定しています。  
※windows10でのみ動作します。  
※macの場合は、X11 system等のDISPLAY設定が別途必要になります。 docker-compose.ymlに記載してください。 ここでは説明は割愛  
※dockerはWSL2にdocker engineをインストールした環境を想定しています。  
※docker desktopを利用する方は、dockerfile項を参照頂き、docker-compose.ymlファイルを修正してください。  

WSL2とdocker engineをインストールするやり方は[こちら](https://www.notion.so/Docker-Desktop-Docker-Docker-Desktop-windows-d0505c525072473999611785e4aa3e73)

## how to setup
1. clone する
2. docker-compose.yml ファイルがあるフォルダに移動し docker-compose up -d でビルド+コンテナ起動
3. VcXsrv をインストールして起動する。Disable access controlにチェックをいれる  https://rin-ka.net/windows-x-server/#toc3
4. WSL上で作成したユーザーフォルダの直下にある.profile フォルダの行末に以下を追加する。
```
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0.0
```
5. docker exec -it {folder name} bash でコンテナの中に入る。
6. コンテナ側で yarn を実行(package.json に記載されたアプリがインストールされる)
7. yarn start で electron が立ち上がって Hello world が表示されたら OK
## 初回起動以降

1. docker-compose up -d で起動
2. visual studio code 等でコンテナにアクセスし開発

## 補足説明
* VcXsrvはX11 systemです。詳細は割愛しますが、Linuxには画像を映す機能が無いので仮想のディスプレイを立ち上げてそこに描画する必要があります。（詳しくはx11でggr）
* docker desktopを使う場合はディスプレイ設定方法が変わります。docker-compose.ymlを開いてコメント行にあるように、以下に書き換える。
```yaml
    # docker engine 環境の場合
    environment:
      - DISPLAY=${DISPLAY}
      # Docker Desktopを使う場合以下でDISPLAY設定が出来る
      # - DISPLAY=host.docker.internal:0
```
```yaml
    # docker desktopの場合
    environment:
      # - DISPLAY=${DISPLAY}
      # Docker Desktopを使う場合以下でDISPLAY設定が出来る
      - DISPLAY=host.docker.internal:0
```

## ディレクトリ構造

[こちら](https://qiita.com/saki-engineering/items/203892838e15b3dbd300)を参考にさせていただきました。


app/  
│  ├─.devcondainer.json/  
│  ├─assets/ #アプリのアイコンを格納  
│  │     ├─mac/  
│  │     │    └─icon_mac.icns #Mac用のアプリアイコン  
│  │     └─/win  
│  │          └─icon_win.ico #windows用のアプリアイコン  
│  ├─dist/ #ビルドされたアプリの格納場所 ※gitignore  
│  ├─node_modules/ # nodejsのライブラリ ※gitignore  
│  ├─.eslintrc.json # vscode用の拡張機能 syntax error拾ってくれる  
│  ├─.prettierrc.json # vscode用の拡張機能 コードフォーマッター  
│  ├─package.json  
│  ├─package-lock.json  
│  ├─yarn.lock  
│  └─src/ # アプリの開発はここ  
│     ├─css/  
│     ├─images/ #アプリ上にある画像  
│     ├─js/  
│     ├─main.js    #メインプロセス  
│     ├─preload.js  
│     ├─renderer.js  
│     ├─index.html # メインプロセスが呼び出す レンダラープロセス  
│     └─***.html  
│  
docker  
│ ├─app/  
│ │     └─dockerfile  
├─.gitignore  
├─docker-compose.yml  
└─README.md  



## packages install
yarn コマンドで以下がインストールされます。
### Dependencies
- [x]  yarn add jquery@1.12.3
- [x]  yarn add datatables.net-bs5
- [x]  yarn add datatables.net-buttons-bs5
- [x]  yarn add datatables.net-select-bs5
- [x]  yarn add poppers.js
- [x]  yarn add bootstrap@5.1.3
- [x]  yarn add bootstrap-icons
- [x]  yarn add danfojs

### devDependencies
- [x]  yarn add —dev prettier
- [x]  yarn add —dev eslint
- [x]  yarn add —dev eslint-config-prettier