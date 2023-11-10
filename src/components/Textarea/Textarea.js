import ReactQuill, { Quill } from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import * as styled from './Textarea.styles';

let icons = Quill.import('ui/icons');

function Toolbar() {
  icons[
    'color'
  ] = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="3 3 24 24" fill="none">
  <path d="M8.55208 4.67118L9.17917 4L14.2542 9.43184C14.4778 9.67118 14.5896 9.96514 14.5896 10.3137C14.5896 10.6623 14.4778 10.9563 14.2542 11.1956L11.6583 13.974C11.4347 14.2133 11.1722 14.333 10.8708 14.333C10.5694 14.333 10.3069 14.2133 10.0833 13.974L7.4875 11.1956C7.26389 10.9563 7.15208 10.6623 7.15208 10.3137C7.15208 9.96514 7.26389 9.67118 7.4875 9.43184L10.2438 6.48179L8.55208 4.67118ZM10.8708 7.15297L7.96875 10.2591H13.7729L10.8708 7.15297ZM15.8 14.5983C15.5083 14.5983 15.2604 14.4891 15.0563 14.2706C14.8521 14.052 14.75 13.7867 14.75 13.4745C14.75 13.2976 14.7889 13.1051 14.8667 12.897C14.9444 12.6889 15.0514 12.4755 15.1875 12.257C15.2653 12.1217 15.3601 11.9761 15.4719 11.82C15.5837 11.6639 15.6931 11.5182 15.8 11.3829C15.9069 11.5182 16.0163 11.6639 16.1281 11.82C16.2399 11.9761 16.3347 12.1217 16.4125 12.257C16.5486 12.4755 16.6556 12.6889 16.7333 12.897C16.8111 13.1051 16.85 13.2976 16.85 13.4745C16.85 13.7867 16.7479 14.052 16.5438 14.2706C16.3396 14.4891 16.0917 14.5983 15.8 14.5983ZM6 19V17.1113H17.6667V19H6Z" fill="black"/>
</svg>`;

  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>

      <span className="ql-formats">
        <button className="ql-align" value="center" />
        <button className="ql-align" value="right" />
        <button className="ql-align" value="justify" />
      </span>

      <span className="ql-formats">
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </span>

      <span className="ql-formats">
        <select className="ql-color" />
      </span>
    </div>
  );
}

function Textarea() {
  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {},
    },
  };

  const [text, setText] = useState('');
  const [font, setFont] = useState('Noto Sans KR');

  const handleFont = ({ target }) => {
    setFont(target.value);
  };

  const handleText = (e) => {
    setText(e);
  };

  return (
    <div className="text-container">
      <div>
        <styled.Title>내용을 입력해 주세요</styled.Title>
        <styled.TextEditorLayout id="text-editor" font={font}>
          <Toolbar />
          <ReactQuill
            className={font}
            value={text}
            onChange={handleText}
            modules={modules}
          />
        </styled.TextEditorLayout>
      </div>
      <styled.Spacing />
      <div>
        <styled.Title>폰트 선택</styled.Title>
        <form>
          <styled.Select onChange={handleFont}>
            <option value="Noto Sans KR">Noto Sans</option>
            <option value="Nanum Pen Script">나눔 펜스크립트</option>
            <option value="Nanum Myeongjo">나눔 명조</option>
            <option value="IBM Plex Sans KR">IBM plex</option>
            <option value="Dokdo Regular">독도</option>
          </styled.Select>
        </form>
      </div>
    </div>
  );
}

export default Textarea;
