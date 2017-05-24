//import other plugins here if you would like
export default function testPlugin({
    config,
    db,
    actions,
    Material,
    Grommet,
    appState
}){
    //return some side effect?
    actions.afterLogin((user)=>{
      //perform some actions here
      db.getID().then((id)=>{
        console.log(id);
      });
    });

    actions.renderHeader.subscribe((Header,props)=>{
      let oldHeader = Header;
      console.log(oldHeader);
      return <div>hello header</div>
    });

    actions.renderFooter.subscribe((Footer,props)=>{
      return <Grommet.Footer></Grommet.Footer>
    });
}
