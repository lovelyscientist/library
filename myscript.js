$(function () {
	$(".button1").click(function () {
		$(".container").append("<p>Hello</p>");
	})
	$(".button2").click(function () {
		$("p").last().remove();
	})
})