module.exports = {
    hideLoader: function hideLoader() {

        $("nav").css({
            display: "flex"
        });
        $("footer").css({
            display: "flex"
        });
        $("#loader-wrapper").remove();
    }
}