import { useState } from 'react'
import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import EasyEdit, {Types} from 'react-easy-edit';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

function NewNote() {
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [post, setPost] = React.useState([])
	const [editorState, setEditorState] = React.useState(
    	() => EditorState.createEmpty(),
		//EditorState.createWithContent(ContentState.createFromText(text))
	)

	// for chakra-ui modal
	const { isOpen, onOpen, onClose } = useDisclosure()

	React.useEffect(() => {
		//axios.get('http://127.0.0.1:3344/api/list').then((rep) => {
		//	console.log(rep);
		//	setPost(rep.data.articles);
		//});
	}, [])

	const sendHandler = () => {
		let message = editorState.getCurrentContent().getPlainText('\u0001');
		axios({
			method: 'post',
			url: 'http://127.0.0.1:3344/api/notes/add',
			headers: {'content-type': 'application/json'},
			data: {title: title, body: message}
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

	return (
		<>
			<div className="text-end p-3">
				<button className="btn btn-primary rounded-1" onClick={sendHandler}>Share</button>
			</div>
			<div className="text-start p-3">
				<div className="h3">
				<EasyEdit
					type={Types.TEXT}
					onSave={save}
					onCancel={cancel}
					saveButtonLabel="save"
					cancelButtonLabel="cancel"
					onHoverCssClass="no"
					attributes={{ name: "awesome-input", id: 1}}
				/>
				</div>
				<Editor editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName" 
					onEditorStateChange={setEditorState}>abc</Editor>
			</div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notes has been saved</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          	Ready to back to main pags.
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
