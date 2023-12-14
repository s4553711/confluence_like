import { useState } from 'react'
import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import userLogo from './assets/user.png'
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

import AuthConsumer from './AuthProvider2.jsx';

function NewNote() {
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [post, setPost] = React.useState('')
	const [touch, setTouch] = React.useState(false)
	const [editor, setEditor] = React.useState({})
	const { user, avatar } = AuthConsumer();

	console.log(user);

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
			url: '/api/notes/add',
			headers: {'content-type': 'application/json'},
			data: {title: title, body: post, user: user}
		}).then((rep) => {
			console.log(rep);
			onOpen();
		});
	}

	// chakra modal handler
	const modal_close_handler = () => {
		navigate("/pages");
	}

	const assign_editor = (e) => {
		setEditor(e);
	}

	// inline-editor handler
	const save = (value) => {
		setTitle(value);
		console.log(value);
	}
	const cancel = () => {console.log("Cancelled")}

	return (
		<>
			<div className="d-flex flex-column h-100">
			<div className="text-start p-3 flex-fill d-flex flex-column">
				<div className="d-flex flex-row my-2 align-items-center">
					<div className="h3 flex-fill">
						<EasyEdit
							type={Types.TEXT}
							onSave={save}
							onBlur={save}
							onCancel={cancel}
							saveButtonLabel="save"
							cancelButtonLabel="cancel"
							onHoverCssClass="no"
							value=""
							hideSaveButton={true}
							hideCancelButton={true}
							attributes={{ name: "awesome-input", id: 1}}
						/>
					</div>
					<div className="me-4 d-flex flex-row">
						<img src={avatar} alt="" width="32" height="32" className="rounded-circle me-2"/>
						<div className="align-self-center">{user}</div>
					</div>
					<div><button className="btn btn-primary rounded-1" onClick={sendHandler}>Share</button></div>
				</div>
				<ReactQuill ref={assign_editor} theme="snow" value={post} onChange={setPost} modules={my_modules} className="flex-grow-1 pb-1 d-flex flex-column"/>
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

export default NewNote
