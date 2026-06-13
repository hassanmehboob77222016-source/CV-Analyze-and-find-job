import faiss
from sentence_transformers import SentenceTransformer

_embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def create_vector_store(chunks: list[str]) -> faiss.IndexFlatL2:
    if not chunks:
        raise ValueError("Cannot create vector store from empty chunks.")

    embeddings = _embedding_model.encode(chunks, convert_to_numpy=True).astype("float32")
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    return index


def retrieve_relevant_chunks(
    query: str,
    vector_store: faiss.IndexFlatL2,
    chunks: list[str],
    top_k: int = 5,
) -> list[str]:
    if not query.strip() or not chunks:
        return []

    query_vector = _embedding_model.encode([query], convert_to_numpy=True).astype("float32")
    k = min(top_k, len(chunks))
    _, indices = vector_store.search(query_vector, k)
    return [chunks[i] for i in indices[0] if i >= 0]
