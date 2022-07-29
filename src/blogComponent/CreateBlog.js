import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";

const CreateBlog = ({ setIsPending }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("김코딩");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        /* 등록 버튼을 누르면 게시물이 등록이 되며 home으로 리다이렉트 되어야 합니다. */
        /* 작성한 내용과 useNavigate를 이용하여 작성해보세요. */
        let makeBlog = {
            title,
            body,
            author,
            likes: 0,
        };
        setIsPending(true);
        fetch("http://localhost:3001/blogs/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(makeBlog),
        }).then(() => {
            navigate("/", { replace: true });
            window.location.reload();
            setIsPending(false);
        });
        //console.log(e.type);
    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>제목</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해주세요."
                />
                <label>내용</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="내용을 입력해주세요."
                ></textarea>
                <label>작성자</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="kimcoding">김코딩</option>
                    <option value="parkhacker">박해커</option>
                </select>
                <button onClick={handleSubmit}>등록</button>
            </form>
            <Footer />
        </div>
    );
};

export default CreateBlog;
