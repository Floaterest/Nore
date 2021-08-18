enum HTMLClass{
    Hidden = 'hidden',
    Underline = 'underline',
    HideContent = 'hide-content',
}

function toggleClass(condition: boolean, $el: JQuery, className: HTMLClass){
    if(condition){
        $el.addClass(className);
    }else{
        $el.removeClass(className);
    }
}

function isSelecting(){
    return document.getSelection()!.type != 'Caret';
}

function update(content: string): JQuery{
    $content.html(content).find('ruby').on('click', function(){
        if(isSelecting()) return;
        $(this).each(function(){
            this.classList.toggle(HTMLClass.Hidden);
        });
    });
    return $content;
}

/**
 * generate a new item for the table of contents
 * @param text innerText for this element
 * @param path file to download when clicked
 */
function item(text: string, path: string): JQuery{
    return $('<p>').on('click', async function(){
        // if clicked on selected, refresh the content
        let refresh = this.innerText == selected;
        let content = sessionStorage.getItem(path);
        if(refresh || content == null){
            // download file, set session storage, assign to content
            await $.get(path, f => sessionStorage.setItem(path, content = f));
        }
        kashi = new Kashi(update(content!));

        selected = this.innerText;
        document.body.classList.remove(HTMLClass.HideContent);
        window.scrollTo(0, 0);

    }).text(text);
}


class Kashi{
    isSwitched = false;
    isToggled = false;

    $ruby: JQuery;
    $rt: JQuery;

    constructor(content: JQuery){
        this.$ruby = content.find('ruby');
        this.$rt = this.$ruby.find('rt');
    }

    /**
     * switch rt and rb
     */
    switch(){
        this.isSwitched = !this.isSwitched;
        this.$ruby.each(function(){
            this.innerHTML = this.innerHTML.replace(/(\S+)(<rt.*>)(\S+)/, '$3$2$1');
        });

        toggleClass(this.isSwitched, this.$ruby, HTMLClass.Underline);
    }

    toggle(){
        this.isToggled = !this.isToggled;
        toggleClass(this.isToggled, this.$rt, HTMLClass.Hidden);
    }
}
