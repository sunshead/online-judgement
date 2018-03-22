# BitTiger-CS503-1802
# BitTiger-CS503-1802作业提交方法
## 0. 写在前面的注意事项  
1. 请同学们通过在 **zhewangjoe/BitTiger-CS503-1802** repo下创建branch并**将作业提交到branch**
2. *Fork a repo*是被允许的, 同学们可以通过维护一个fork来将自己的作业成果进行展示, 但是**请不要通过这种方式提交作业**  
3. 关于某些上课没有要求的东西需不需要提交？ 评分的时候是只根据作业要求来判定的, 但是建议同学们把自己觉得需要存档的文件上传。 因为这个github的repo不仅仅是用来给你的作业进行评分的, 更是你参与BitTiger-CS503-1802课程学习的记录, 将自己每次学习到的知识整理并储存起来, 才能更好的提升自己嘛～
4. 如果想在本地查看老师代码，建议在新的路径下clone和pull老师代码，以避免同一个路径下重复操作。

## 1. 如何提交一份作业？
下面我通过使用自己的一个空repo作为例子来展示如何提交一份作业, 我的例子可能和实际情况有出入, 希望大家理解的部分是:  
1. create your branch  
2. synchronize it with the original repo  
```bash
~/Documents/gitlearn(master) » ls                                                               
README.md week1
```
这是原始的repo, **week1**这个文件夹代表了第一次作业  
现在我提交创建一个branch, 命名为**test**（请同学们使用自己的ID命名）  
```bash
~/Documents/gitlearn(master) » git checkout -b test                                             
Switched to a new branch 'test'
```
OK，现在我们有了一个属于自己的branch, 以后所有的作业**请在这个branch下进行提交操作**   
让我们看看我们现在拥有的branch:  
```bash
~/Documents/gitlearn(test) » git branch -vv                                                     
  master 4cf5649 [origin/master] clean
* test   4cf5649 clean
```
可以看到我们拥有了两个branch, **master**代表老师布置作业的branch, **test**代表同学们自己需要提交作业的branch  
现在我们需要添加自己的作业了, 这里我用一个自己生成的文件(date.txt)作为例子  
```bash
~/Documents/gitlearn(test) » cd week1                                                           
------------------------------------------------------------
~/Documents/gitlearn/week1(test) » cal > date.txt                                               
------------------------------------------------------------
~/Documents/gitlearn/week1(test*) » ls                                                          
date.txt
```
可以看到我们已经添加了自己的作业！现在, 将它上传！
```bash
~/Documents/gitlearn/week1(test*) » git add .                                                   
------------------------------------------------------------
~/Documents/gitlearn/week1(test*) » git commit -m "HW1"                                         
[test 5dfe704] HW1
 1 file changed, 8 insertions(+)
 create mode 100644 week1/date.txt
------------------------------------------------------------
~/Documents/gitlearn/week1(test) » git push --set-upstream origin test                          
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 459 bytes | 459.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0)
To https://github.com/mmdtoycar/gitlearn.git
 * [new branch]      test -> test
Branch 'test' set up to track remote branch 'test' from 'origin'.
```
看到**Writing objects: 100% (4/4), 459 bytes | 459.00 KiB/s, done.**的提示, 我们知道已经上传成功了, 现在可以去网页上确认了, 如果一切顺利的话, 你会看到  
![submission succeeded](https://i.imgur.com/AbON6fo.png)  
现在, 点击branch的名字, 你就可以看到自己已提交的作业内容了

## 2. 如果老师更新了一份新的作业，我该如何同步呢？
比如, 老师添加了一次新的作业, 名字是week2
![new homework](https://i.imgur.com/yXZEK1A.png)  
```bash
~/Documents/gitlearn(test) » git checkout master                                                
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
------------------------------------------------------------
~/Documents/gitlearn(master) » git pull                                                         
Already up to date.
```
切回master分支, 然后通过pull获得最新的代码
```bash
~/Documents/gitlearn(master) » git checkout test                                                
Switched to branch 'test'
Your branch is up to date with 'origin/test'.
------------------------------------------------------------
~/Documents/gitlearn(test) » git merge origin/master                                            
Merge made by the 'recursive' strategy.
 week2/hw2.java | 9 +++++++++
 1 file changed, 9 insertions(+)
 create mode 100644 week2/hw2.java
```
这样就获得了最新的代码，接下来就可以开始第二次的作业啦！～

---

Reference:  
1. [week0 Git 学习及使用指南](https://docs.google.com/document/d/15su2LzPkABIF4FEpbLoa5G29a9YJgLOdRKcFzDrBg4g/edit)  
2.  [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
