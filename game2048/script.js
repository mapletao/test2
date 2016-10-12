// JavaScript Document
//动画效果
//初始时添加两个数字
function showNumberAnimate(i,j,randNumber)
{
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);
	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

//移动效果
function showMoveAnimation(fromX,fromY,toX,toY)
{
	var numberCell=$("#number-cell-"+fromX+"-"+fromY);
	numberCell.animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY)
		},200);
}

function updateScore(score)
{
	$("#score").text(score);
}