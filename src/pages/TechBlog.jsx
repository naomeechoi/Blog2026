import { useEffect, useState } from "react";
import { marked } from "marked";
import BlogLayout from "../components/BlogLayout";
import { CATEGORY_COLORS } from "../constants/categories";

// tech 폴더 안의 md 파일 전부 불러오기
const postFiles = import.meta.glob("../posts/tech/**/*.md", {
  as: "raw",
});

export default function TechBlog() {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadPosts = async () => {
      const loaded = await Promise.all(
        Object.values(postFiles).map(async resolver => {
          const raw = await resolver();

          // front matter 분리
          const match = raw.match(/---([\s\S]*?)---([\s\S]*)/);
          if (!match) return null;

          const [, frontMatter, content] = match;

          const meta = Object.fromEntries(
            frontMatter
              .trim()
              .split("\n")
              .map(line => {
                const [key, ...rest] = line.split(":");
                return [key.trim(), rest.join(":").trim()];
              })
          );

          return {
            ...meta,
            content,
          };
        })
      );

      // 최신 글이 위로 오게 정렬
      const sorted = loaded
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setPosts(sorted);
      setCurrent(sorted[0]);
    };

    loadPosts();
  }, []);

  // ✅ selectedCategory 변경 시 자동으로 최신 글 선택
  useEffect(() => {
    if (posts.length === 0) return;

    const filtered =
      selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    setCurrent(filtered[0]);
  }, [selectedCategory, posts]);

  // 선택된 카테고리에 따라 글 필터링
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(post => post.category === selectedCategory);

  // 작성시간 화면 표시용 함수
  const formatDate = dateStr => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} T${hour}:${minute}`;
  };

  return (
    <BlogLayout
      sidebar={
        <>
          <h3 style={{ marginBottom: "12px" }}>Tech Blog</h3>

          {/* 카테고리 필터 버튼 */}
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setSelectedCategory("All")}
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                border: "none",
                background: selectedCategory === "All" ? "#000" : "#ddd",
                color: selectedCategory === "All" ? "white" : "black",
                cursor: "pointer",
                outline: "none",
              }}
            >
              All
            </button>

            {Object.keys(CATEGORY_COLORS).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    selectedCategory === cat ? CATEGORY_COLORS[cat] : "#eee",
                  color: selectedCategory === cat ? "white" : "black",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 글 목록 */}
          {filteredPosts.map(post => {
            const isSelected = current?.title === post.title;
            return (
              <div
                key={post.title}
                onClick={() => setCurrent(post)}
                style={{
                  cursor: "pointer",
                  marginBottom: "16px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: isSelected
                    ? CATEGORY_COLORS[post.category] || "#eee" // 선택된 글만 카테고리 색상
                    : "transparent", // 나머지는 투명
                  color: isSelected ? "white" : "black", // 선택 글은 흰색 글씨
                  border: isSelected ? "none" : "1px solid #ccc", // 선택 안 된 글 구분용
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  {post.title}
                </strong>

                {/* 작성시간 */}
                <div
                  style={{
                    fontSize: "12px",
                    color: isSelected ? "inherit" : "#666",
                    marginTop: "6px",
                  }}
                >
                  {formatDate(post.date)}
                </div>
              </div>
            );
          })}
        </>
      }
    >
      {current && (
        <>
          <h1 style={{ marginBottom: "8px" }}>{current.title}</h1>

          {/* 본문 상단 category badge */}
          {current.category && (
            <div
              style={{
                display: "inline-block",
                marginBottom: "8px",
                padding: "4px 12px",
                fontSize: "12px",
                borderRadius: "999px",
                color: "white",
                background: CATEGORY_COLORS[current.category] || "#6b7280",
              }}
            >
              {current.category}
            </div>
          )}

          {/* 작성시간 본문 표시 */}
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              marginBottom: "16px",
            }}
          >
            {formatDate(current.date)}
          </div>

          {/* 글 내용 */}
          <div
            dangerouslySetInnerHTML={{
              __html: marked(current.content),
            }}
          />
        </>
      )}
    </BlogLayout>
  );
}