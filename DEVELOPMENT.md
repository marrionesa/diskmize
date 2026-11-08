# DiskMize — Development Roadmap

**Project:** DiskMize  
**Repository:** https://github.com/marrionesa/diskmize  
**Author:** Mario R.
**Language:** Python 3.12+  
**GUI Framework:** Tkinter  
**License:** GPL-3.0-or-later

---

## 1. Purpose

This document defines the technical development direction of DiskMize.

Its purpose is to establish a practical roadmap for improving the application's filesystem analysis capabilities, performance, usability, reliability, and safety.

The roadmap is intended to evolve alongside the project. Proposed features are not considered implemented until they have been developed, tested, and integrated into the application.

## 2. Current Project Baseline

According to the current project documentation, DiskMize provides:

- Directory and drive scanning.
- File and folder size inspection.
- File searching.
- File opening and revealing through desktop file-manager actions.
- Scan cancellation.
- English and Spanish interfaces.
- Configurable appearance and scan options.
- File deletion functionality.

The application uses Python and Tkinter and targets Linux as its currently tested platform.

Python 3.12 or newer is required.

## 3. Development Priorities

### 3.1. Filesystem Scanning Engine

Improve the reliability and efficiency of filesystem traversal.

Planned improvements:

- Optimize recursive directory traversal.
- Improve handling of inaccessible directories and files.
- Handle symbolic links consistently and prevent unintended recursive traversal.
- Improve scan cancellation responsiveness.
- Track scan progress and provide more useful status information.
- Handle files disappearing or changing during an active scan.
- Reduce unnecessary filesystem operations.

**Goal:** Build a reliable scanning foundation capable of handling large directory trees without compromising application responsiveness.

### 3.2. Storage Analysis and Visualization

Expand the application's ability to explain how storage is being consumed.

Potential improvements:

- Directory size breakdowns.
- Largest files and directories identification.
- Storage distribution by file extension.
- File-type statistics.
- Directory size comparisons.
- Improved sorting and filtering.
- More informative storage summaries.

**Goal:** Help users understand storage consumption rather than simply displaying a list of files.

### 3.3. Duplicate File Detection

Introduce an optional duplicate-file analysis capability.

Proposed functionality:

- Identify potential duplicates using file size as an initial filtering criterion.
- Compare file contents using cryptographic hashes.
- Group matching files.
- Display duplicate locations and sizes.
- Calculate potentially recoverable storage space.
- Allow users to review duplicate groups before taking action.

Duplicate detection should remain independent of the normal directory scanning workflow.

**Goal:** Provide a reliable way to identify redundant files without risking accidental data loss.

### 3.4. Performance and Resource Management

Improve application performance when analyzing large filesystems.

Areas to investigate:

- Efficient directory traversal.
- Controlled concurrency for filesystem operations.
- Memory consumption during large scans.
- Avoid unnecessary retention of filesystem metadata.
- Incremental result processing.
- Efficient sorting and filtering of large result sets.
- Avoid blocking the Tkinter main event loop.

Any background processing implementation must preserve safe communication with the Tkinter UI thread.

**Goal:** Keep DiskMize responsive and resource-efficient during demanding operations.

### 3.5. File Management Safety

File deletion requires particular attention because the current documented operation permanently removes files.

Potential improvements:

- Explicit deletion previews.
- Clear confirmation dialogs containing the selected paths.
- Protection against accidental directory-level deletion.
- Revalidation of file paths immediately before deletion.
- Better reporting of unsuccessful deletion operations.
- Optional integration with desktop trash functionality where supported.

The existing permanent deletion behavior must not silently change without an explicit implementation decision.

**Goal:** Make destructive operations predictable, transparent, and difficult to trigger accidentally.

### 3.6. Search and Filtering

Improve the existing file search experience.

Potential improvements:

- Search by filename.
- Filter by file extension.
- Filter by minimum and maximum file size.
- Filter by file type.
- Combine multiple search criteria.
- Improve responsiveness when searching large result collections.

Search enhancements should reuse scan results whenever practical instead of unnecessarily traversing the filesystem again.

### 3.7. Internationalization and Interface

Continue improving the existing English and Spanish interface.

Potential improvements:

- Centralize translatable interface strings.
- Ensure new features support both languages.
- Improve error messages and operational feedback.
- Maintain consistent terminology across dialogs.
- Improve keyboard accessibility.
- Review layout behavior for large result collections.

New functionality must not introduce untranslated interface elements.

## 4. Architecture and Maintainability

Future development should preserve a clear separation of responsibilities.

Areas to evaluate and maintain:

- Filesystem scanning.
- Storage analysis.
- Search and filtering.
- File operations.
- User interface.
- Configuration and preferences.
- Localization.

Avoid introducing unnecessary dependencies or architectural complexity.

New functionality should be implemented in independently testable components wherever practical.

Before restructuring existing modules, inspect the current architecture and identify the actual dependencies between components.

## 5. Testing Strategy

Every new feature should include appropriate automated tests.

Priority testing areas:

- Directory traversal.
- Empty directories.
- Large files and directory trees.
- Permission-denied scenarios.
- Symbolic links.
- Filesystem changes during scanning.
- Scan cancellation.
- Duplicate detection and hash comparison.
- Search and filtering.
- File deletion safeguards.
- Configuration handling.
- Localization.

Use temporary directories and controlled filesystem fixtures to avoid modifying real user data during tests.

GUI integration tests may require an active graphical session or a virtual display such as Xvfb.

## 6. Development Workflow

Install the project with development dependencies:

```bash
python -m pip install -e ".[dev]"
```

Run the project:

```bash
python -m diskmize
```

Run the current quality checks:

```bash
python -m pip check
python -m pytest -q
python -m ruff check src tests
python -m ruff format --check src tests
```

All new changes should pass the relevant checks before integration.

## 7. Proposed Implementation Roadmap

The following sequence provides a practical development direction.

| Phase | Focus | Priority |
|---|---|---|
| 1 | Review and strengthen filesystem scanning | High |
| 2 | Improve scan progress and cancellation | High |
| 3 | Improve large-result performance | High |
| 4 | Expand storage analysis and statistics | Medium |
| 5 | Introduce duplicate-file detection | Medium |
| 6 | Improve search and filtering | Medium |
| 7 | Strengthen deletion safeguards | High |
| 8 | Expand automated test coverage | Continuous |
| 9 | Evaluate additional platform support | Future |

These phases are proposed development priorities, not commitments to a particular release schedule.

## 8. Platform Compatibility

Linux remains the primary tested development platform.

Windows and macOS support should be evaluated separately.

Platform-specific filesystem behavior, permissions, symbolic links, desktop integration, and file-management operations must be considered before declaring additional platform support.

## 9. Development Principles

Future contributions should follow these principles:

1. Reliability before feature quantity.
2. Safe filesystem operations.
3. Efficient resource utilization.
4. Responsive graphical interface.
5. Minimal unnecessary dependencies.
6. Maintainable and testable code.
7. Consistent English and Spanish localization.
8. Backward compatibility where practical.
9. Documented behavior and limitations.
10. No claims of functionality that has not been implemented and verified.

---

**Document status:** Living development roadmap.

This document describes the current documented baseline and proposed future improvements. It should be updated as features are implemented and development priorities evolve.
