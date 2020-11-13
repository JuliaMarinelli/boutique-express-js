const categorieTitle = $(".categorie-title")

categorieTitle.on("click", function(e){
    const title = $(this);
    const cardList = title.siblings(".card-list")
    const icon = title.children("i")
    cardList.toggle("slow")
    icon.text(icon.text() == "arrow_drop_up" ? "arrow_drop_down" : "arrow_drop_up");
})