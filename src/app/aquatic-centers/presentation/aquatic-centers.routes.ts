import {Routes} from '@angular/router';

//const courseList = () => import('./presentation/views/course-list/course-list').then(m => m.CourseList);
const reservationForm = () => import('./components/reservation-form/reservation-form').then(m => m.ReservationForm);
/**
 * Route tree for learning presentation views.
 */
export const aquaticCentersRoutes: Routes = [
  //{ path: 'reservations',              loadComponent: courseList },
  { path: 'reservations/new',          loadComponent: reservationForm },
  { path: 'reservations/:id/edit',     loadComponent: reservationForm },
  //{ path: 'categories',           loadComponent: categoryList },
];
