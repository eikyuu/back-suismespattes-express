import { WalkController } from './controller/WalkController';

export const Routes = [
  // Walks
  {
    method: 'get',
    route: '/walks',
    controller: WalkController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/walks/:slug',
    controller: WalkController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/walks',
    controller: WalkController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/walks/:slug',
    controller: WalkController,
    action: 'remove',
  },
  {
    method: 'post',
    route: '/walks/images',
    controller: WalkController,
    action: 'uploadImage',
  },
  {
    method: 'get',
    route: '/walks/images/:filename',
    controller: WalkController,
    action: 'getImage',
  },
];
