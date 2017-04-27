#curl -XPOST -H "Content-Type:application/graphql"  -d 'query RootQueryType { count }' http://localhost:3000/graphql
curl -XPOST -H 'Content-Type:application/graphql'  -d '{ count }' http://localhost:3000/graphql
