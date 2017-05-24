//import other plugins here if you would like
export default function testPlugin({
    config,
    db,
    graphql,
    apiRoutes,
    actions,
    Material,
    Grommet
}){
    //return some side effect?
    actions.afterLogin((user,store)=>{
      //perform some actions here
      db.getUsers().then((users)=>{
        console.log(users);
      })
    });

    actions.renderHeader((Header,store)=>{
      let oldHeader = Header;
      console.log(oldHeader);
      return <div>hello header</div>
    });

    actions.renderFooter((Footer,store)=>{
      return <Grommet.Footer></Grommet.Footer>
    });

    apiRoutes.get('/test',(req,res)=>{
      res.send('test plugin');
    })

    return apiRoutes;
}
