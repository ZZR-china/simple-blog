> A Blog CMS Powered By Vue.js

> 一个前端基于Vue.js，后端基于Node.js的博客内容管理器

### [Demo](http://115.28.90.175:90/#!/)
### 登陆地址在Demo页面最下方

## Features

* 支持MarkDown语法编辑
* 博客页面对移动端优化
* 支持代码高亮
* 就是要酷炫~~

###### 前端：Vue全家桶
* Vue.js
* Vue-Cli
* Vue-Resource
* Vue-Validator
* Vue-Router
* Vuex
* Vue-loader

###### 后端
* Node.js
* mongoDB (mongoose)
* Express

###### 工具和语言
* Webpack
* ES6
* SASS
* Jade


进入项目目录
```
cd CMS-of-Blog
```
安装依赖
```
npm install
```
进入服务器所在文件夹并运行服务器
```
cd server
node www
```
打开浏览器输入http://localhost:3000/
如果一切OK，则进入博客的归档页面，登陆按钮在最下方。
###### 注意
* **第一次从node启动时，数据库会初始化，自动插入两个用户，分别是和'admin'，'游客'，前者有管理员权限，默认密码是111.**
* 如果需要改动，则在第一次启动前打开server目录下的init.js，初始化数据放在该文件中。
* 推荐[MongoChef](http://3t.io/mongochef/)作为mongoDB可视化管理工具
* 如果有疑问，欢迎交流~
=======
# juejin
express leancloud vue restful api

