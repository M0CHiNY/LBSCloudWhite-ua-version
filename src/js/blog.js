// blog height
const blogItems = document.querySelectorAll('.article__content');


if (blogItems.length > 0) {

    let maxHeight = 0;

    blogItems.forEach(function(item) {
        
        const itemHeight = item.clientHeight;

        if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
        }
    });

    blogItems.forEach(function(item) {
        item.style.height = maxHeight + 'px';
    });
} else {
    console.warn('Not found elem .blog__item.');
}
