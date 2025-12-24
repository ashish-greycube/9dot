$(document).ready(function () {
    // Append a new list item (li) to the navbar's unordered list (ul)
    $('div.navbar-collapse ul.navbar-nav').append(`
        <li id="my-custom-nav-item" class="nav-item" style="position: absolute; top: 14px; left: 35px;">
            <i class="fa fa-th" aria-hidden="true" style="font-size: 2em; color: #fff; cursor:pointer;"></i>
        </li>
    `);

    $("#my-custom-nav-item .fa").on("click", async () => {
        d = await get_custom_links_html()
        const element = `
            <div style="background-color:#e0e0e0; opacity:0.9; border-radius:10px; position:absolute; top:60px; width:300px; height:300px; z-index:1000; left:30px;" class="custom-popup">
                <div class="container text-center" style="padding:20px;">
                  <div class="row row-cols-3">
                    ${d}
                  </div>
                </div>
            </div>
        `
        $(".custom-popup").remove();
        $("body").append(element);
    });
});

$(document).on("click", ".custom-app-icon", function () {
    $(".custom-popup").remove();
});

$(document).on("click", function () {
    if ($("div[class='custom-popup']").length > 0) {
        $(".custom-popup").remove();
    }
});

async function get_custom_links() {
    doc = await frappe.db.get_doc('Dot9 Settings')
    return doc.dot9_details
}

async function get_custom_links_html() {
    var html = ``;
    links = await get_custom_links();
    console.log(links)
    for (let link in links) {
        html += `
            <div class="col" style="margin:10px 0 !important;">
                <a type="button" href="${links[link].url}" target="_blank" class="custom-app-icon">
                    <img src="${links[link].icon}" style="width:50px; height:50px;"/><br>
                    <p>${links[link].label}</p>
                </a>
            </div>
        `
    }
    return html;
}