docker build -t public.ecr.aws/f4r3h2b5/aha-backend -f apps/backend/Dockerfile .
docker build -t public.ecr.aws/f4r3h2b5/aha-frontend -f apps/frontend/Dockerfile .

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/f4r3h2b5
docker push public.ecr.aws/f4r3h2b5/aha-backend
docker push public.ecr.aws/f4r3h2b5/aha-frontend