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
    issue: any;
    rootTree: RootTree;

    constructor(item: any) {
        if (item !== null) {
            this.id = item.id;
            this.name = item.name;
            this.description = item.description;
            this.date_create = item.date_create;
            this.type_project = item.type_project
            this.list_user = [];
            if (item.list_project_user !== undefined) {
                if (item.list_project_user !== null) {
                    item.list_project_user.forEach(element => {
                        let i = new List_Project_User(element);
                        this.list_user.push(i);
                    });
                }
            }
            this.issue = [];
            if (item.issue !== undefined) {
                if (item.issue.length > 0) {
                    item.issue.forEach(element => {
                        let i = new Issue(element);
                        this.issue.push(i);
                    });
                }
            }
            if (item.rootTree !== undefined) {
                this.rootTree = item.rootTree;
            }

        }
    }
}

export class Issue {
    id: any;
    name: String;
    description: String;
    user: User;
    comments: any;
    status: Boolean;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.user = new User(item.user);
        this.comments = item.comments;
        if (item.status !== undefined) {
            if (item.status !== null) {
                this.status = item.status === 'True' ? true : false;
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

export class RootTree {
    id: any;
    name: String;
    dateCreate: String;
    children: any;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
        this.dateCreate = item.dateCreate;
        this.children = [];
        if (item.children !== undefined) {
            item.children.forEach(element => {
                this.children.push(new RootTree(element));
            });
        }
    }
}