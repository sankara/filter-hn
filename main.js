var hiddenUsers = ["brootstrap"];


(function($) {
    var matchingUsers = $(".hnuser");

    matchingUsers.each(function() {
        $this = $(this);
        if(!hiddenUsers.includes($this.text()))
            return;
        $this.parents("tr.comtr")
            //.addClass("coll")
            .addClass("noshow");
    });

    //recoll();
})(jQuery);
