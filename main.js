(function($) {
    browser.storage.sync.get().then(function(settings) {
        hideUnsavoryCommenters(settings.hiddenUsers);
    });

    function hideUnsavoryCommenters(hiddenUsers) {
        $(".hnuser").each(function() {
            $this = $(this);
            if(!hiddenUsers.includes($this.text()))
                return;
            $this.parents("tr.comtr")
                //.addClass("coll")
                .addClass("noshow");
        });
        //recoll();
    }

    function addHideLinks() {
        $(".hnuser")
    }

})(jQuery);
