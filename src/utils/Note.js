import Swal from 'sweetalert2'
import axios from 'axios'



export function showAddModal({ token, updater }) {
    Swal.fire({
        title: "Add Note 📝",
        html: `
        <input type="text" placeholder="Enter Title" id="title" class="form-control mb-2"/>
        <textarea type="text" placeholder="Enter Content" id="Content" class="form-control"></textarea>
      `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
            const title = document.getElementById('title').value
            const Content = document.getElementById('Content').value
            return { title, Content }
        },
        allowOutsideClick: false
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) addNote({ title: result.value.title, content: result.value.Content, token, updater })

    });
}



async function addNote({ title, content, token, updater }) {

    const { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes', {
        title, content
    }, {
        headers: {
            token
        }
    })
    if (data.msg === 'done') {
        console.log(data);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been Added",
            showConfirmButton: false,
            timer: 1500
        });
        getUserNotes({ token, updater })
    }
}



export async function getUserNotes({ token, updater }) {
    console.log(token);
    try {
        const { data } = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes', {
            headers: {
                token
            }
        })

        await updater(data.notes)
    } catch (error) {
        updater([])
    }
}



export function showDeleteModal({ token, noteId, updater }) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteNote({ token, noteId, updater }).then(
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Note has been deleted.",
                    icon: "success"
                })
            )

        }
    });
}

export async function deleteNote({ token, noteId, updater }) {
    const { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers: {
            token
        }
    })
    getUserNotes({ token, updater })
    console.log(data);
}









export function showUpdateModal({ prevTitle, prevContent, noteId, token, updater }) {
    Swal.fire({
        title: "Update Note 📝",
        html: `
        <input type="text" placeholder="Enter Title" id="title" class="form-control mb-2"  value="${prevTitle}"/>
        <textarea type="text" placeholder="Enter Content" id="Content" class="form-control"  >${prevContent}</textarea>
      `,
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
            const title = document.getElementById('title').value
            const Content = document.getElementById('Content').value
            return { title, Content }
        },
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) updateDate({ newTitle: result.value.title, newContent: result.value.Content, noteId, token, updater })
    });
}



async function updateDate({ newTitle, newContent, noteId, token, updater }) {
    const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        title: newTitle,
        content: newContent
    }, {
        headers: {
            token
        }
    })

    getUserNotes({ token, updater }).then(
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been Updated",
            showConfirmButton: false,
            timer: 1500
        })
    )
}