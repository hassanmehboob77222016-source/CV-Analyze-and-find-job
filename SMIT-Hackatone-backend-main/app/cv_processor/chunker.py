def chunk_text(text: str) -> list[str]:
    cleaned = text.strip()
    if not cleaned:
        return []

    if len(cleaned) < 500:
        return [cleaned]

    chunk_size = 500
    overlap = 50
    min_chunk_size = 20
    step = chunk_size - overlap
    chunks: list[str] = []

    start = 0
    while start < len(cleaned):
        chunk = cleaned[start : start + chunk_size].strip()
        if len(chunk) >= min_chunk_size:
            chunks.append(chunk)
        start += step

    return chunks
