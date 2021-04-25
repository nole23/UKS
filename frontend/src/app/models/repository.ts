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
    typeProject: Boolean;
    listUser: any;
    issue: any;
    rootTree: any;

    constructor(item: any) {
        if (item !== null) {
            this.id = item.id;
            this.name = item.name;
            this.description = item.description;
            this.date_create = item.date_create;
            this.typeProject = item.typeProject
            this.listUser = [];
            if (item.listUser !== undefined) {
                if (item.listUser !== null) {
                    item.listUser.forEach(element => {
                        let i = new List_Project_User(element);
                        this.listUser.push(i);
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
            this.rootTree = []
            if (item.rootTree !== undefined) {
                if (item.rootTree !== null) {
                    item.rootTree.forEach(element => {
                        let rt = new RootTree(element);
                        this.rootTree.push(rt);
                    });
                }
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
            this.name = item.roleName;
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

export class Files {
    id: any;
    name: any;
    cover: any;
    dateCreate: any;
    user: any;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
        this.cover = item.cover;
        this.dateCreate = item.dateCreate;
        this.user = item.user;
    }
}

export class ChildremTree {
    id: any;
    nameNode: any;
    dateCreate: any;
    userCreate: any;
    files: any;
    childrenFolder: any;

    constructor(item: any) {
        this.id = item.id;
        this.nameNode = item.nameNode;
        this.dateCreate = item.dateCreate;
        this.userCreate = item.userCreate;
        this.files = [];
        if (item.files !== undefined) {
            if (item.files !== null) {
                item.files.forEach(element => {
                    let f = new Files(element);
                    this.files.push(f);
                });
            }
        }
        this.childrenFolder = [];
        if (item.childrenFolder !== undefined) {
            if (item.childrenFolder !== null) {
                item.childrenFolder.forEach(element => {
                    let cf = new ChildremTree(element);
                    this.childrenFolder.push(cf);
                });
            }
        }
    }
}

export class RootTree {
    id: any;
    nameBranch: String;
    dateCreate: String;
    userCreate: any;
    files: any;
    childrenFolder: any;

    constructor(item: any) {
        this.id = item.id;
        this.nameBranch = item.nameBranch;
        this.dateCreate = item.dateCreate;
        this.userCreate = item.userCreate;
        this.files = [];
        if (item.files !== undefined) {
            if (item.files !== null) {
                item.files.forEach(element => {
                    let f = new Files(element);
                    this.files.push(f);
                });
            }
        }
        this.childrenFolder = [];
        if (item.childrenFolder !== undefined) {
            if (item.childrenFolder !== null) {
                item.childrenFolder.forEach(element => {
                    this.childrenFolder.push(new ChildremTree(element))
                });
            }
        }
    }
}