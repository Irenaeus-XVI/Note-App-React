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
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        console.log(result);
        addNote({ title: result.value.title, content: result.value.Content, token, updater })
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
        getUserNotes({ token, updater })
    }
}



export async function getUserNotes({ token, updater }) {
    const { data } = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes', {
        headers: {
            token
        }
    })

    updater(data.notes)
}