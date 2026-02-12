Athlete Photo Uploader

A lightweight internal admin tool for attaching profile photos to athletes in a structured database.

This project solves a simple but operationally persistent problem:
how to reliably associate unstructured image files with structured identity records.

The tool provides a fast, deterministic interface for uploading or replacing an athlete’s profile photo by selecting the athlete from a searchable list.

No bulk processing. No automation magic. Just a clean join between identity and media.

⸻

Problem

Athlete records exist in a structured database.

Profile images exist as files.

Without a stable mechanism to connect the two:
	•	Images get mismatched
	•	Filenames become the source of truth
	•	Manual errors creep in
	•	Gallery rendering becomes fragile

This tool ensures the database remains the canonical source of truth and images are explicitly attached to athlete records using a unique identifier.
