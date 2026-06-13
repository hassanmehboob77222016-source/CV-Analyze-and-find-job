from app.cv_processor.chunker import chunk_text


def test_chunk_text_splits_long_text():
    text = "Python developer " * 80
    chunks = chunk_text(text)
    assert len(chunks) > 1
    assert all(len(chunk) <= 500 for chunk in chunks)


def test_chunk_text_keeps_short_text_as_single_chunk():
    text = "a" * 120
    chunks = chunk_text(text)
    assert chunks == [text]


def test_chunk_text_empty_input():
    assert chunk_text("") == []
    assert chunk_text("   ") == []
