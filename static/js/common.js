/**
 * Created by tarena on 19-1-5.
 */
function createXhr() {
    if(window.XMLHttpRequest)
        return new XMLHttpRequest();
    else
        return new ActiveXObject("Microsoft.XMLHTTP")

}
