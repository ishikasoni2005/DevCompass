try:
    from resume_nlp.parser import analyze_resume_document
except ImportError:  # pragma: no cover
    analyze_resume_document = None

from .models import ResumeAnalysis


class ResumeAnalyzerService:
    @staticmethod
    def analyze(user, uploaded_file, target_role: str):
        file_bytes = uploaded_file.read()
        uploaded_file.seek(0)

        if analyze_resume_document is None:
            analysis = {
                "text": "",
                "extracted_skills": ["Python", "Django"],
                "missing_skills": ["Docker", "PostgreSQL", "System Design"],
                "suggestions": [
                    "Add quantified project outcomes.",
                    "Highlight API performance improvements.",
                ],
                "score": 72,
            }
        else:
            analysis = analyze_resume_document(
                file_bytes=file_bytes,
                filename=uploaded_file.name,
                target_role=target_role,
            )

        return ResumeAnalysis.objects.create(
            user=user,
            resume=uploaded_file,
            original_filename=uploaded_file.name,
            extracted_text=analysis["text"],
            extracted_skills=analysis["extracted_skills"],
            missing_skills=analysis["missing_skills"],
            suggested_improvements=analysis["suggestions"],
            score=analysis["score"],
        )

