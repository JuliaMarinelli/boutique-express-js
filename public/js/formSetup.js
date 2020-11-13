$(document).ready(function(){
    $('.datepicker').datepicker();
    $("select").formSelect();
});

let removeForm = $('#removeForm')
let updateForm = $('#updateForm')

$("#message-confirmation").hide()
$("#message-error").hide()


removeForm.on("submit", function(e){
    e.preventDefault();
    let productSelect = $("#productSelect")
    $.ajax({
        type:'DELETE',
        url : "/remove-product/"+productSelect.val(),
    }).then(function(response){
        if(response.error){
            $("#message-confirmation").hide()
            $("#message-error").show()
        } else {
            $("#message-confirmation").show()
            $("#message-error").hide()

            let product = response.product;
            $('#productSelect option[value="'+ product.id+'"]').remove()
            $("select").formSelect();
            removeForm.get(0).reset();
        }
    })
})

updateForm.on("submit", function(e){
    e.preventDefault();
    let id = window.location.pathname.split("/")[2];
    let product = {
        id : id,
        name : $("#product_name").val(),
        quantity : $("#quantity").val(),
        img : $("#img_url").val(),
        date : $("#date").val(),
        livraison :$("#livraison").is(":checked"),
        categorie :$("#categorieSelect").val(),
        prix :$("#price").val()
    }

    $.ajax({
        type:'PUT',
        url : "/update-product?product="+JSON.stringify(product),
    }).then(function(response){
        if(response.error){
            $("#message-error").show()
        } else {
            window.location.href = "/product/"+response.id;
        }
    })
})
