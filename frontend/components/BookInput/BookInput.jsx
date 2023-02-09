import React, {useCallback, useRef} from 'react';


const BookInput = ({onBookLoaded}) => {

    /**
     * @type {React.MutableRefObject<HTMLInputElement>}
     */
    const inputRef = useRef();


    const changeFile = useCallback(async () => {
        if(!inputRef.current){
            return;
        }

        /**
         * @type {File}
         */
        const file = inputRef.current.files[0];

        const reader = new FileReader();

        reader.readAsArrayBuffer(file)

        reader.addEventListener('load', e => {

            onBookLoaded?.(e.target.result)

        });


    }, [inputRef])

    return <input ref={inputRef} onChange={changeFile} type="file" />
}

export default BookInput
