import { useState } from 'react'
import React from 'react'
import {Link, useNavigate, useLoaderData} from "react-router-dom";
import axios from 'axios';
import EasyEdit, {Types} from 'react-easy-edit';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, ButtonGroup,
} from '@chakra-ui/react'

export async function loader ({params}) {
	let rep = await axios.get('http://127.0.0.1:3344/api/note/'+params.pageId);
	console.log(rep);
	return {
		old_title: rep.data.data.title, 
		old_content: rep.data.data.content,
		tid: rep.data.data.id,
		pageId: params.pageId
	};
}

function Edit() {
	const navigate = useNavigate()
	const {pageId, tid, old_content, old_title} = useLoaderData()
	const [title, setTitle] = useState(old_title)
	const [post, setPost] = React.useState(old_content)
	const [touch, setTouch] = React.useState(false)
	const [editor, setEditor] = React.useState({})

	const my_modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, 5, 6]}, {'font':[]}, {'size':[]}],
			[{ 'color': [] }, { 'background': [] }],
			['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
			['align', {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
			['link', 'image'],
			['clean']
		],
	}

	// for chakra-ui modal
	const { isOpen, onOpen, onClose } = useDisclosure()

	React.useEffect(() => {
	}, [])

	const sendHandler = () => {
		if (post != '' && title != '') {
			setTouch(true)
		} else {
			onOpen()
			return
		}
		axios({
			method: 'post',
			url: 'http://127.0.0.1:3344/api/notes/edit',
			headers: {'content-type': 'application/json'},
			data: {title: title, body: post, tid: tid}
		}).then((rep) => {
			console.log(rep);
			onOpen();
		});
	}

	// chakra modal handler
	const modal_close_handler = () => {
		navigate("/pages");
	}

	// inline-editor handler
	const save = (value) => {
		setTitle(value);
		console.log(value);
	}
	const cancel = () => {console.log("Cancelled")}

	const assign_editor = (e) => {
		setEditor(e);
	}

	return (
		<>
			<div className="d-flex flex-column h-100">
			<div className="text-start p-3 flex-fill d-flex flex-column">
				<div className="d-flex flex-row my-2">
					<div className="h3 flex-fill">
				<EasyEdit
					type={Types.TEXT}
					onSave={save}
					onBlur={save}
					onCancel={cancel}
					saveButtonLabel="save"
					cancelButtonLabel="cancel"
					onHoverCssClass="no"
					value={title}
					hideSaveButton={true}
					hideCancelButton={true}
					attributes={{ name: "awesome-input", id: 1}}
				/>

					</div>
					<button className="btn btn-primary rounded-1" onClick={sendHandler}>Share</button>
				</div>
				<ReactQuill ref={assign_editor} theme="snow" value={post} onChange={setPost} modules={my_modules} />
			</div>
			</div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Messages</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
				{touch ? ('Pages saved and ready to back to main pags.') : ('Leave page without saving.')}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={modal_close_handler}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
		</>
	)
}

export default Edit
