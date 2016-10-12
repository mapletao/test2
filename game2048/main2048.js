// JavaScript Document
//数组
var board=new Array();
//分数
var score=0;
//检测是否叠加
var hasConflicted=new Array();

$(document).ready(function(e){
	newgame();
});

function newgame(){
	//初始化棋牌格
	init();
	//在随机两个各自生成数字2、4
	CreateOneNumber();
	CreateOneNumber();
}

//初始化棋牌格函数
function init()
{
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//获取16个格子
			var gridCell=$("#grid-cell-"+i+"-"+j);
			//定位
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++)
	{
		//将board定义为二维数组
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++)
		{
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	updateBoardView();
	score=0;
}

//更新数据
function updateBoardView()
{
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0)
			{
				//隐藏number
				theNumberCell.css("width","0");
				theNumberCell.css("height","0");
				theNumberCell.css("top",getPosTop(i,j)+50);
				theNumberCell.css("left",getPosLeft(i,j)+50);
			}
			else
			{
				//显示number
				theNumberCell.css("width","100px");
				theNumberCell.css("height","100px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
}

//创建随机生成数字的函数
function CreateOneNumber(){
	//检测是否有空间来生成数字
	if(nospace(board))
		return false;
	//随机一个位置
	//随机x y
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	//死循环该位置是否可用
	while(true)
	{
		if(board[randx][randy]==0)
			break;
		//如果不能需要重新生成
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}
	//随机一个数字2或4
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberAnimate(randx,randy,randNumber);
	return true;
}

//按键反应
$(document).keydown(function(event){
	switch(event.keyCode)
	{
		case 37://left
		//按下left时 所有元素向左移动
			if(moveLeft()){
				//移动后要添加一个新的数
				setTimeout("CreateOneNumber()",210);
				//判断游戏是否结束
				setTimeout("isGameOver()",300);
			}
			break;
		case 38://up
			if(moveUp()){
				//移动后要添加一个新的数
				setTimeout("CreateOneNumber()",210);
				//判断游戏是否结束
				setTimeout("isGameOver()",300);
			}
			break;
		case 39://right
			if(moveRight()){
				//移动后要添加一个新的数
				setTimeout("CreateOneNumber()",210);
				//判断游戏是否结束
				setTimeout("isGameOver()",300);
			}
			break;
		case 40://down
			if(moveDown()){
				//移动后要添加一个新的数
				setTimeout("CreateOneNumber()",210);
				//判断游戏是否结束
				setTimeout("isGameOver()",300);
			}
			break;
		default:
			break;
	}
});

//左移函数
function moveLeft()
{
	//判断是否可以左移
	if(!canMoveLeft(board))
		return false;
	//左移 是否产生数字的叠加  或者是什么都不干
	//落脚点判断
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<j;k++)
				{
					//落脚点是否为空
					//是否有障碍物
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					//是否能叠加
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
					{
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//加分情况
						score+=board[i][k];
						updateScore(score);
						//是否发生碰撞 即是否叠加了一次
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

//右移函数
function moveRight()
{
	//判断是否可以右移
	if(!canMoveRight(board))
		return false;
	//左移 是否产生数字的叠加  或者是什么都不干
	//落脚点判断
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>j;k--)
				{
					//落脚点是否为空
					//是否有障碍物
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					//是否能叠加
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
					{
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//加分统计
						score+=board[i][k];
						updateScore(score);
						//是否发生碰撞 即是否叠加了一次
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

//上移函数
function moveUp()
{
	//判断是否可以左移
	if(!canMoveUp(board))
		return false;
	//左移 是否产生数字的叠加  或者是什么都不干
	//落脚点判断
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<i;k++)
				{
					//落脚点是否为空
					//是否有障碍物
					if(board[k][j]==0&&noBlockHorizontalU(j,k,i,board))
					{
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					//是否能叠加
					else if(board[k][j]==board[i][j]&&noBlockHorizontalU(j,k,i,board)&&!hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//加分统计
						score+=board[k][j];
						updateScore(score);
						//是否发生碰撞 即是否叠加了一次
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

//下移函数
function moveDown()
{
	//判断是否可以下移
	if(!canMoveDown(board))
		return false;
	//左移 是否产生数字的叠加  或者是什么都不干
	//落脚点判断
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>i;k--)
				{
					//落脚点是否为空
					//是否有障碍物
					if(board[k][j]==0&&noBlockHorizontalU(j,i,k,board))
					{
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					//是否能叠加
					else if(board[k][j]==board[i][j]&&noBlockHorizontalU(j,i,k,board)&&!hasConflicted[k][j])
					{
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//加分统计
						score+=board[k][j];
						updateScore(score);
						//是否发生碰撞 即是否叠加了一次
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

//游戏是否结束 没有空间而且不能移动
function isGameOver()
{
	if (nospace(board)&& nomove(board))
	{
		gameover();
	}
}

//gameover处理
function gameover()
{
	alert("gameover!");
}