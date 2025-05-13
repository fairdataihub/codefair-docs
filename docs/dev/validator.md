---
lang: en-US
title: Running Locally
description: Runnning the Codefair GitHub repository locally
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# :hammer_and_wrench: Adding a Validation Endpoint

Extend Codefair’s **Validator Microservice** (Flask + Flask-RESTX) by adding custom HTTP endpoints under `validator/apis`. Follow the sections below to seamlessly integrate your new validation logic.

## :sparkles: Overview

This guide walks through creating a new validation route, securing inputs, updating dependencies, and testing your endpoint locally.

## :bookmark: Prerequisites

- A Python 3.8+ environment
- Familiarity with Flask and RESTful APIs

## :rocket: Register a New API Route

Create a new route in `validator/apis/__init__.py`:

```python
@api.route('/validate-json', endpoint='validate-json')
class ValidateJSON(Resource):
    """Validate a JSON file at given path or URL"""

    @api.response(200, 'Success')
    @api.response(400, 'Validation Error')
    @api.expect(
        api.parser()
           .add_argument(
               'file_path', type=str,
               help='The path or URL of the JSON file',
               required=True,
           )
    )
    def post(self):
        """Validate a JSON file"""
        args = api.payload or {}
        file_path = args.get('file_path')

        # Input validation
        if not file_path:
            return {'message': 'Validation Error', 'error': 'file_path is required'}, 400

        # Instantiate and run your custom validator
        validator = JsonValidator()
        result = validator.validate(file_path)

        if result.get('valid'):
            return {'message': 'valid', 'details': result['message']}, 200
        else:
            return {'message': 'invalid', 'error': result['message']}, 400
```

> 📌 You can base this on existing validators like `ValidateCWL` for consistent style.

## :lock: Input Sanitization & Security

Ensure robust input handling to prevent attacks:

- **Path traversal:** Reject `..` or leading `/` in `file_path`.
- **Command injection:** Forbid characters like `;`, `&`, `|` or use `shlex.quote()` if invoking subprocesses.
- **Remote URLs:** Allow only `http://` and `https://` when downloading content.

Reuse helper functions (e.g., `clean_output`) from other endpoints to sanitize and parse external tool outputs.

## :package: Update Dependencies & Entrypoint

1. **Dependencies:** If your validator relies on new libraries (e.g., `jsonschema`), add them to `validator/requirements.txt`.
2. **Entrypoint:** No changes required in `validator/app.py`—all `@api.route` decorators are auto-registered via `api.init_app(app)`.

> 🔄 Remember to import your new validator module in `validator/app.py` if it’s not picked up automatically:
>
> ```python
> import validators.json_validator
> ```

## :white_check_mark: Testing Your Endpoint

1. **Activate your environment:**

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. **Install dependencies:**

   ```bash
   pip install -r validator/requirements.txt
   ```

3. **Run the service:**

   ```bash
   python validator/app.py --host $HOST --port $PORT
   ```

4. **Test via `curl` or Postman:**

   ```bash
   curl -X POST http://localhost:5000/validate-json \
       -H 'Content-Type: application/json' \
       -d '{"file_path": "path/to/file.json"}'
   ```

Look for a JSON response indicating `valid` or `invalid` along with details or error messages.

---

Happy validating with Codefair! 🚀
