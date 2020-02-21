import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todoes;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.todoes = this.http.get("/assets/todoes.json");
  }
}
