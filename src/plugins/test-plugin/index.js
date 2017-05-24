//import other plugins here if you would like
export default function testPluginServer({
    config,
    db,
    graphql,
    apiRoutes,
    actions,
    Material,
    Grommet
}){
    //return some side effect?
    actions.afterLogin((user,id)=>{
      //perform some actions here
    });

    actions.renderHeader((store)=>{
      return <div>hello header</div>
    });

    actions.renderFooter((store)=>{
      return <Grommet.Footer></Grommet.Footer>
    });
}
