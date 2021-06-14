const admin = [
    {
        "id": "100",
        "titleName": "用户数据",
        "icon": "el-icon-s-custom",
        "children": [
            {
                "id": "101",
                "titleName": "用户列表",
                "path": "userList"
            },
        ],
    },
    {
        "id": "110",
        "titleName": "书籍数据",
        "icon": "el-icon-reading",
        "children": [
            {
                "id": "111",
                "titleName": "书籍列表",
                "path": "bookList",
                "off": {
                    "addMine":false,
                    "addData": false,
                    "editData": false,
                    "removeData": false,
                    "checkbox":false
                }
            }
        ]
    },{
        "id": "120",
        "titleName": "数据分布",
        "icon": "el-icon-pie-chart",
        "children": [
            {
                "id": "121",
                "titleName": "用户数据",
                "path": "userData",
            },{
                "id": "122",
                "titleName": "书籍数据",
                "path": "bookData",
            }
        ],
    },
];
const teacher = [
    {
        "id": "110",
        "titleName": "购买书籍",
        "icon": "el-icon-reading",
        "children": [
            {
                "id": "111",
                "titleName": "书籍列表",
                "path": "bookList",
                "off": {
                    "addMine":true,
                    "addData": false,
                    "editData": false,
                    "removeData": false,
                    "checkbox":true
                }
            }
        ]
    }
]
const book = [
    {
        "id": "110",
        "titleName": "发布书籍",
        "icon": "el-icon-reading",
        "children": [
            {
                "id": "111",
                "titleName": "书籍列表",
                "path": "bookList",
                "off": {
                    "addMine":false,
                    "addData": true,
                    "editData": true,
                    "removeData": true,
                    "checkbox":true
                }
            }
        ]
    }
];
module.exports = {
    admin,
    book,
    teacher
}