import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Order from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  http = inject(HttpClient);

  getOrder(){
   return this.http.get<Order[]>("http://localhost:3000/orders")
  }
  addOrder(order:Order){
    return this.http.post<Order>("http://localhost:3000/orders",order);
  }
  getOrders(id:string){
    return this.http.get<Order>("http://localhost:3000/orders/" + id);
  }
  updateOrder(id:string,order:Order){
    return this.http.put<Order>("http://localhost:3000/orders/"+id,order);
  }
  deleteOrder(id:string){
    return this.http.delete("http://localhost:3000/orders/"+id);
   }
}
