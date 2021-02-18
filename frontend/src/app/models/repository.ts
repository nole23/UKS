import { User } from 'src/app/models/user';

export class Repository {
    name: String;
    description: String;
    type_project: Boolean = false;
}

export class Project {
    id: any;
    name: String;
    description: String;
    date_create: String;
    type_project: Boolean;
    list_user: any;

    constructor(item: any) {
        if (item !== null) {
            this.id = item.id;
            this.name = item.name;
            this.description = item.description;
            this.date_create = item.date_create;
            this.type_project = item.type_project
            this.list_user = [];
            if (item.list_project_user !== null) {
                item.list_project_user.forEach(element => {
                    let i = new List_Project_User(element);
                    this.list_user.push(i);
                });
            }
        }
    }
}

export class Role {
    name: String;

    constructor(item: any) {
        if (item !== null) {
            this.name = item.name;
        }
    }
}

export class List_Project_User {
    user: User;
    role: Role;

    constructor(item: any) {
        if (item !== null) {
            this.user = new User(item.user);
            this.role = new Role(item.role);
        }
    }
}
