import { UserController } from "./controller/UserController"
import { WalkController } from './controller/WalkController'

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
// Walks
{
    method: "get",
    route: "/walks",
    controller: WalkController,
    action: "all"
},
{
    method: "get",
    route: "/walks/:slug",
    controller: WalkController,
    action: "one"
},
{
    method: "post",
    route: "/walks",
    controller: WalkController,
    action: "save"
},
{
    method: "delete",
    route: "/walks/:slug",
    controller: WalkController,
    action: "remove"
},
{
    method: "post",
    route: "/walks/images",
    controller: WalkController,
    action: "uploadImage"
},
{
    method: "delete",
    route: "/walks/images/:filename",
    controller: WalkController,
    action: "removeImage"
},
{
    method: "get",
    route: "/walks/images/:filename",
    controller: WalkController,
    action: "getImage"
},

]