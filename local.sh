#! /bin/sh

SRC_DIR=""

rm -rf dist
mkdir -p dist

cp -rf app/assets dist/
cp -rf app/build dist/
cp -rf app/bower_components dist/
cp -rf app/index.html dist/

# 打包目录 dist.tar这个名字发送变化以后，对于的远端脚本 tran.sh脚本需要修改
tar cvf dist.tar dist

./tran.sh

#rm -rf dist.tar
