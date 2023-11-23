export default function({ route}, inject){
  if(route.path !== '/'){
    inject('showButton', true)
  }else{
    inject('showButton',false)
  }
}